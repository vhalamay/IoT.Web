using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IoT.Web.Data.Migrations
{
    /// <inheritdoc />
    public partial class CreateSessionsTableAndAddAuditColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Devices_DeviceId",
                table: "Activities");

            migrationBuilder.RenameColumn(
                name: "Updated",
                table: "Devices",
                newName: "UpdatedOn");

            migrationBuilder.RenameColumn(
                name: "Created",
                table: "Devices",
                newName: "CreatedOn");

            migrationBuilder.RenameColumn(
                name: "Updated",
                table: "Activities",
                newName: "UpdatedOn");

            migrationBuilder.RenameColumn(
                name: "DeviceId",
                table: "Activities",
                newName: "SessionId");

            migrationBuilder.RenameColumn(
                name: "Created",
                table: "Activities",
                newName: "CreatedOn");

            migrationBuilder.RenameIndex(
                name: "IX_Activities_DeviceId",
                table: "Activities",
                newName: "IX_Activities_SessionId");

            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "Devices",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Devices",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                table: "Devices",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Updatedby",
                table: "Devices",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Activities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Deleted",
                table: "Activities",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Updatedby",
                table: "Activities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Sessions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeviceId = table.Column<long>(type: "bigint", nullable: false),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Updatedby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sessions_Devices_DeviceId",
                        column: x => x.DeviceId,
                        principalTable: "Devices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_DeviceId",
                table: "Sessions",
                column: "DeviceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Sessions_SessionId",
                table: "Activities",
                column: "SessionId",
                principalTable: "Sessions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Sessions_SessionId",
                table: "Activities");

            migrationBuilder.DropTable(
                name: "Sessions");

            migrationBuilder.DropColumn(
                name: "Active",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "Updatedby",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "Updatedby",
                table: "Activities");

            migrationBuilder.RenameColumn(
                name: "UpdatedOn",
                table: "Devices",
                newName: "Updated");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "Devices",
                newName: "Created");

            migrationBuilder.RenameColumn(
                name: "UpdatedOn",
                table: "Activities",
                newName: "Updated");

            migrationBuilder.RenameColumn(
                name: "SessionId",
                table: "Activities",
                newName: "DeviceId");

            migrationBuilder.RenameColumn(
                name: "CreatedOn",
                table: "Activities",
                newName: "Created");

            migrationBuilder.RenameIndex(
                name: "IX_Activities_SessionId",
                table: "Activities",
                newName: "IX_Activities_DeviceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Devices_DeviceId",
                table: "Activities",
                column: "DeviceId",
                principalTable: "Devices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
